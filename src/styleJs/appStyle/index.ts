import { createUseStyles } from "vue-jss";
export default createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  title: {
    width: "100%",
    height: 100,
    textAlign: "center",
    lineHeight: "100px",
    fontSize: 44,
    fontFamily: "STKaiti",
    color: "#fff",
    fontWeight: "bold",
    backgroundImage: "linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)",
    position: "fixed",
    zIndex: 999,
  },
  menu: {
    width: "95%",
    margin: "0 auto",
    marginBottom: 20,
    marginTop: 120,
  },
  code: {
    width: "75%",
    flexShrink: 0,
  },
  codePanel: {
    minHeight: 400,
    marginBottom: 20,
  },
  uiAndValue: {
    display: "flex",
    justifyContent: "space-between",
    "& > *": {
      width: "46%",
    },
  },
  content: {
    width: "95%",
    margin: "0 auto",
    display: "flex",
    flexWrap: "nowrap",
  },
  form: {
    padding: "0 30px",
    flexGrow: 1,
  },
  menuButton: {
    appearance: "none",
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "inline-block",
    padding: 15,
    borderRadius: 5,
    "&:hover": {
      background: "#efefef",
    },
    fontFamily: "STHeiti",
  },
  menuSelected: {
    backgroundImage: "linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%)",
    color: "#fff",
    "&:hover": {
      background: "#337ab7",
      fontFamily: "STHeiti",
    },
  },
  button: {
    width: 60,
    height: 30,
    backgroundColor: "rgba(113,190,255,1)",
    border: "none",
    cursor: "pointer",
    borderRadius: 5,
    display: "block",
    margin: "10px auto",
    color: "#fff",
  },
});
