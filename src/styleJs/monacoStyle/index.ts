import { createUseStyles } from "vue-jss";
export default createUseStyles({
  container: {
    border: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
  },
  title: {
    backgroundColor: "#eee",
    padding: "10px 0",
    paddingLeft: 20,
  },
  code: {
    flexGrow: 1,
  },
});
