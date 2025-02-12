type Props = {
  src?: string;
};

const ImgColumn = ({ src }: Props) => {
    const img = src ?? "";
  return <img src={img} className="w-10 h-10 rounded-full" />;
};

export default ImgColumn;
