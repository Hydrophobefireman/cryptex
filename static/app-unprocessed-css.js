const obj = {
  prefixedStyles: [
    {
      key: { prefix: "", selector: "html", global: true },
      props: { WebkitTapHighlightColor: "transparent" }
    },
    {
      key: { prefix: "#", selector: "app-root" },
      props: { textAlign: "center" }
    },
    {
      key: { selector: "body", global: true },
      props: {
        "--primary-color": "#2977f5;",
        "--translate-normal-pos": "translate(1%, 150%);",
        "--translate-up": "translate(1%, 1%);",
        "--text-color": "#000;",
        "--border-shadow-color": "#e3e3e3;",
        "--header-text-color": "#fff;",
        "--background-color": "#fff;",
        "--button-color": "var(--primary-color);",
        "--raised-shadow":
          "0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        transition: "0.3s ease-in-out",
        fontFamily: '"Open Sans", sans-serif',
        margin: 0,
        padding: 0,
        userSelect: "none"
      }
    },
    {
      key: { selector: "body[dark]", global: true },
      props: {
        "--label-color": "#fff",
        "--translate-normal-pos": "translate(1%, 150%)",
        "--translate-up": "translate(1%, 1%)",
        "--text-color": "#fff",
        "--border-shadow-color": "#6d6969",
        "--background-color": "#000000",
        "--button-color": "#ffffff"
      }
    },
    {
      key: { selector: "div[data-cx]", global: true },
      props: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "30%",
        padding: "20px",
        width: "50%",
        textAlign: "center",
        margin: "auto",
        marginTop: "10px",
        marginBottom: "10px",
        borderRadius: "20px",
        border: "2px solid var(--border-shadow-color)",
        boxShadow: "var(--raised-shadow)"
      }
    },
    {
      key: { selector: "div[description]", global: true },
      props: { textTransform: "capitalize", fontWeight: "bold" }
    },
    {
      key: { selector: "select", global: true },
      props: {
        display: "block",
        margin: "auto",
        border: "2px solid var(--border-shadow-color)",
        padding: "10px",
        borderRadius: "10px",
        fontWeight: "bold"
      }
    },
    {
      key: { selector: "[err]", global: true },
      props: {
        color: "#d40000",
        fontWeight: "bold"
      }
    }
  ],
  kvStyles: {
    center: {
      margin: "auto",
      textAlign: "center",
      marginTop: "50px"
    },
    shell: {
      position: "absolute",
      height: "100%",
      width: "100%",
      color: "#fff",
      animation: "reveal_banner 0.55s ease-in-out;"
    },
    "module-load-error": {
      backgroundColor: "#f75555fa;"
    },
    app: {
      backgroundColor: "var(--primary-color);"
    },
    "start-app-action": {
      border: "none",
      animation: "unreveal_banner 0.55s ease-in-out",
      transition: "0.5s ease-in-out",
      backgroundColor: "var(--primary-color)",
      color: "#fff",
      boxShadow: "var(--raised-shadow)",
      padding: "10px",
      borderRadius: "15px",
      width: "35%",
      textTransform: "uppercase",
      fontWeight: "bold",
      outline: "none",
      cursor: "pointer",
      margin: "10px"
    },
    "title-header": {
      position: "fixed",
      top: "0",
      width: "100%",
      backgroundColor: "var(--primary-color)",
      padding: "10px",
      color: "#fff",
      fontWeight: "bold"
    },
    "dashed-border": {
      borderRadius: "20px",
      height: "400px",
      width: "50%",
      border: "2px dashed var(--border-shadow-color)",
      margin: "auto",
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    clicker: {
      color: "var(--primary-color)",
      fontWeight: "bold",
      fontSize: "1.5rem",
      textDecoration: "underline",
      cursor: "pointer"
    },
    "file-details": {
      width: "40%",
      margin: "auto",
      padding: "10px",
      borderRadius: "20px"
    },
    "item-l": {
      display: "flex",
      border: "2px solid var(--border-shadow-color)",
      borderTop: "1px solid var(--border-shadow-color)",
      borderBottom: "1px solid var(--border-shadow-color)"
    },
    "file-handler": {
      height: "40px",
      width: "40px",
      boxShadow: "inset 0px 0px 0 3px var(--border-shadow-color)",
      animation: "progressVague 1.5s ease-in",
      animationDelay: "0.3s",
      animationIterationCount: "infinite"
    },
    "key-gen-enter": {
      width: "40%",
      borderRadius: "10px",
      padding: "5px",
      margin: "10px",
      border: "2px solid var(--border-shadow-color)",
      boxShadow: "var(--raised-shadow)",
      textAlign: "center"
    },
    "file-name-download": {
      color: "#4e4d4d",
      fontWeight: "bold"
    },
    "svg-box-div": {
      height: "40px",
      margin: "auto",
      width: "40px"
    },
    "attach-icon": {
      height: "24px",
      width: "24px"
    },
    flex: {
      display: "flex"
    },
    "display-name": {
      fontSize: "20px"
    }
  },
  stringStyles: `
  .hoverable:not([disabled]) {
    cursor: pointer;
    transition: 0.3s ease-in-out;
    transform-style: preserve-3d;
  }
  .hoverable:hover:not([disabled]),
  .hoverable:active:not([disabled]),
  .hoverable:focus:not([disabled]) {
    transform: perspective(1px) scale(1.048) translate3d(0, 0, 0);
  }
  .revs-h {
    height: 20px;
    width: 20px;
    transition: 0.1s ease-in-out;
    margin-right: 5px;
  }
  .revs-h:hover,
  .revs-h:active,
  .revs-h:focus {
    transform: rotate(180deg);
  }
  
  @media screen and (max-width: 800px) {
    .file-details {
      width: 90%;
    }
  }
  .prop {
    flex: 1;
  }
  .prop.k {
    text-transform: capitalize;
    font-weight: bold;
    border-right: 1px solid var(--border-shadow-color);
  }
  
  .prop.v {
    border-left: 1px solid var(--border-shadow-color);
  }
  @keyframes progressVague {
    0% {
      border-radius: 50%;
      transform: scale(1);
    }
    50% {
      border-radius: 50%;
      transform: scale(1.3);
    }
    100% {
      border-radius: 50%;
      transform: scale(1);
    }
  }
  
  `
};
module.exports = obj;
