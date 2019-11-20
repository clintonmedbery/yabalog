export const styles = {
    button: {
        margin: '1em'
    },
    line: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: "break-all"
    },
    cards: {
        width: "100%",
        backgroundColor: "#313335"
    },
    modal: {
        height: "100%",
        overflowY: "scroll",
        outline: 'none'
    },
    fullLogs: {
        height: "80%",
        overflowY: "scroll"
    }
};

export const classes = theme => ({
    wrapper: {
        padding: '1em',
        margin: '1em',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.text
    },
    fullLogCard: {
        overflowY: "scroll",
        height: "80%",
        padding: '1em',
        margin: '1em',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.text
    },
    button: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.button,
        marginBottom: ".5em",
        marginTop: "1em"
    },
    inputStyle: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.inputText,
        width: '30em'
    }
});