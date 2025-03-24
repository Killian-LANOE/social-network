import { TextField } from "@mui/material";

function ConnectionForm() {
  return (
    <form className="h-full w-auto flex flex-col justify-center gap-2">
      <TextField
        color="primary"
        id="standard-basic"
        label="email"
        variant="standard"
        name="email"
        type="email"
      />
      <TextField
        id="standard-basic"
        label="password"
        variant="standard"
        name="password"
        type="password"
      />
    </form>
  );
}
export default ConnectionForm;
