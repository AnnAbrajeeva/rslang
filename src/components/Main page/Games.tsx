import { useEffect } from "react";

const Games = (props: { setIsFooter: (arg0: boolean) => void }) => {
  useEffect(() => props.setIsFooter(false), [props]);

  return <p>Games</p>;
};

export default Games;
