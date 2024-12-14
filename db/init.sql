-- 포스트 테이블
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 태그 테이블
CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  tag VARCHAR(255) NOT NULL UNIQUE
);

-- 포스트와 태그의 관계 테이블(Many-to-Many)
CREATE TABLE IF NOT EXISTS post_with_tags (
  post_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- 포스트 업데이트 시 자동으로 업데이트되는 함수
CREATE OR REPLACE FUNCTION update_post() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 포스트 업데이트 시 자동으로 업데이트되는 트리거
CREATE OR REPLACE TRIGGER update_post_trigger
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_post();

-- 기존 프로시저 삭제
DROP PROCEDURE IF EXISTS create_post;

-- 사용자가 입력한 게시글의 제목, 내용, 복수의 태그들을 저장하고 게시글과 태그들의 관계를 자동으로 저장하는 프로시저
CREATE OR REPLACE PROCEDURE create_post(
  IN p_title VARCHAR(255),
  IN p_content TEXT,
  IN p_tags VARCHAR(255)[]
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_post_id INT;
BEGIN
  -- 포스트 저장
  INSERT INTO posts (title, content) VALUES (p_title, p_content)
  RETURNING post_id INTO v_post_id;

  -- 태그 저장
  INSERT INTO tags (tag)
  SELECT UNNEST(p_tags)
  ON CONFLICT (tag) DO NOTHING;

  -- 포스트와 태그 관계 저장
  INSERT INTO post_with_tags
  SELECT v_post_id, tag_id
  FROM tags
  WHERE tag IN (SELECT UNNEST(p_tags));

  -- 실패 시 롤백
  EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK;
      RAISE;
END;
$$;