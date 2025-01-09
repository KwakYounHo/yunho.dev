CREATE TABLE IF NOT EXISTS song (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(64) NOT NULL,
  artist VARCHAR(64) NOT NULL,
  album_cover VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS c_content (
  id UUID PRIMARY KEY NOT NULL,
  lyrics TEXT NOT NULL,
  analysis TEXT,
  generate_state INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ
);

ALTER TABLE c_content ADD CONSTRAINT fk_song FOREIGN KEY (id) REFERENCES song(id) ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_song_timestamp
BEFORE UPDATE ON song
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_c_content_timestamp
BEFORE UPDATE ON c_content
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

DROP PROCEDURE IF EXISTS create_song_with_content;

CREATE OR REPLACE PROCEDURE create_song_with_content(
    IN p_id UUID,
    IN p_title VARCHAR(64),
    IN p_artist VARCHAR(64),
    IN p_album_cover VARCHAR(255),
    IN p_lyrics TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO song (id, title, artist, album_cover)
    VALUES (p_id, p_title, p_artist, p_album_cover);

    INSERT INTO c_content (id, lyrics)
    VALUES (p_id, p_lyrics);

    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE;
END;
$$;

CREATE OR REPLACE FUNCTION get_song(IN p_id UUID)
RETURNS TABLE (
  id UUID,
  title VARCHAR(64),
  artist VARCHAR(64),
  albumCover VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY 
    SELECT s.id, s.title, s.artist, s.album_cover
    FROM song AS s
    WHERE s.id = p_id;
END;
$$;
