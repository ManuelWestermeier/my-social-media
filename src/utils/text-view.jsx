function isUrl(text) {
  try {
    const url = new URL(text);
    if (url.protocol == "https:" || url.protocol == "http:") {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
}

function TextView({ text = "" }) {
  const marginLeft = {
    marginLeft: "0.3rem",
  };

  return (
    <div className="text">
      {text.split("\n").map((line, index) => {
        return (
          <p key={index}>
            {line.split(" ").map((word, i) =>
              isUrl(word) ? (
                <a target="_blank" style={marginLeft} key={i} href={word}>
                  {word}
                </a>
              ) : (
                <span style={marginLeft} key={i}>
                  {word}
                </span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

export default TextView;
