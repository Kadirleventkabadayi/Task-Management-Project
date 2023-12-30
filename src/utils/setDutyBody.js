export const setDutyBody = (oldContent, content) => {
  return (
    oldContent +
    "\n" +
    "-----------------------------\n" +
    `${content ? content : ""}`
  );
};
