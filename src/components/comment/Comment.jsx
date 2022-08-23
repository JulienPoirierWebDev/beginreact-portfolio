import { Typography } from "../atom/Typography";

export const Comment = ({ username, comment, createdAt }) => {
  const createdAtDate = new Date(createdAt);

  const formattedDate = `${createdAtDate.getHours()}:${createdAtDate.getMinutes()}} - ${createdAtDate.getDate()}/${createdAtDate.getMonth()}/${createdAtDate.getFullYear()}`;

  return (
    <fieldset className="p-4 pt-2 rounded-md bg-paper border-opacity-25 flex flex-col justify-between">
      <legend className="text-sm text-primary">{username}</legend>
      <Typography variant="body2">{comment}</Typography>
      <Typography
        variant="body2"
        color="secondary"
        className="self-end text-xs"
      >
        {formattedDate}
      </Typography>
    </fieldset>
  );
};
