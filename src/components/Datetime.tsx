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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
        aria-hidden="true"
      >
        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
        <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
      </svg>
      <span className={`${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime pubDatetime={pubDatetime} />
      </span>
    </div>
  );
}

const FormattedDatetime = ({ pubDatetime }: DatetimesProps) => {
  const now = new Date();
  const publishedDate = new Date(pubDatetime);

  const hoursDiff = differenceInHours(now, publishedDate);
  const daysDiff = differenceInDays(now, publishedDate);
  const monthsDiff = differenceInMonths(now, publishedDate);

  let displayDate;

  if (hoursDiff < 24) {
    displayDate = `${hoursDiff} hours ago`;
  } else if (daysDiff < 30) {
    displayDate = `${daysDiff} days ago`;
  } else if (monthsDiff < 12) {
    displayDate = `${monthsDiff} months ago`;
  } else {
    displayDate = format(publishedDate, "yyyy/MM/dd");
  }

  return (
    <div>
      Published:
      <time dateTime={publishedDate.toISOString()} className="ml-2">
        {displayDate}
      </time>
    </div>
  );
};
