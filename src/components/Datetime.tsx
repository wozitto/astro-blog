import {
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  format,
} from "date-fns";

interface DatetimesProps {
  pubDatetime: string | Date;
}

interface Props extends DatetimesProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({
  pubDatetime,
  size = "sm",
  className,
}: Props) {
  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      <span className={`${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime pubDatetime={pubDatetime} />
      </span>
    </div>
  );
}

const FormattedDatetime = ({ pubDatetime }: DatetimesProps) => {
  const publishedDate = new Date(pubDatetime);

  return (
    <div>
      <time dateTime={publishedDate.toISOString()} className="">
        {format(publishedDate, "yyyy/MM/dd")}
      </time>
    </div>
  );
};
