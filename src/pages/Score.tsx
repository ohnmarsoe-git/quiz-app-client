type Props = {
  mark: number;
  totalQuestion: number;
};

const Score: React.FC<Props> = ({ mark, totalQuestion }) => {
  const scroeCal = () => {
    if (mark === 0) {
      return 'Failed!';
    } else {
      return 'Congrats!';
    }
  };

  return (
    <div className="mx-auto mt-5 mb-10">
      <h2 className="text-center text-2xl font-blod text-slate-950 uppercase pb-5">
        {scroeCal()}
      </h2>
      <p className="text-center pb-10">
        You got {mark} out of {totalQuestion}
      </p>
    </div>
  );
};

export default Score;
