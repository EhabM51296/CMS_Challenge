import noProfileImg from "../../../public/uploads/noProfile.jpg"

type Props = {
  src?: string;
};

const ImgColumn = ({ src }: Props) => {
    const img = src ?? noProfileImg;
  return <img src={img} className="w-10 h-10 rounded-full object-cover" />;
};

export default ImgColumn;
