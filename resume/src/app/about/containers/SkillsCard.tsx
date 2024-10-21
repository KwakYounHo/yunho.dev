import { Skills } from "@/models/about/skills";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SkillCard = ({
  title,
  subTitle,
  content,
}: {
  title: string;
  subTitle: string;
  content: Skills;
}) => {
  const { lang, libraryAndFramework, database, tools } = content;
  return (
    <Card>
      <CardHeader>
        <p className={"text-xl capitalize"}>
          <strong>{title}</strong>
        </p>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <CardContent className={"flex flex-col gap-2"}>
        {/* is langs? */}
        {lang && (
          <div>
            <p className={"capitalize"}>language</p>
            <div className={"flex gap-2"}>
              {lang.map((e) => (
                <Badge key={e} className={"bg-foreground/50"}>
                  {e}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* is libs or frameworks */}
        {libraryAndFramework && (
          <div>
            <p className={"capitalize"}>library & framework</p>
            <div className={"flex gap-2"}>
              {libraryAndFramework.map((e) => (
                <Badge key={e} className={"bg-foreground/50"}>
                  {e}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* is DBs? */}
        {database && (
          <div>
            <p className={"capitalize"}>database</p>
            <div className={"flex gap-2"}>
              {database.map((e) => (
                <Badge key={e} className={"bg-foreground/50"}>
                  {e}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* is tools? */}
        {tools && (
          <div>
            <p className={"capitalize"}>tools</p>
            <div className={"flex gap-2"}>
              {tools.map((e) => (
                <Badge key={e} className={"bg-foreground/50"}>
                  {e}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillCard;
