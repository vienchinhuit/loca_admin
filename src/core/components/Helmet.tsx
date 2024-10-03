import { Helmet } from "react-helmet-async";
interface Props {
  title: string
  content: string
}

export default function HelmetPage({title, content}: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
  );
}
