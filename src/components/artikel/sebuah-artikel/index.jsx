/* eslint-disable react/no-children-prop */
import Author from "../author";
import "./style.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

function SebuahArtikel({ title, cover, content, createdAt, owner }) {
  return (
    <div id="sebuah-artikel" className="full-height">
      <Author username={owner?.username} createdAt={createdAt} avatar={owner?.avatar} />
      <h1 className="artikel-judul">{title}</h1>
      <img className="artikel-cover" src={cover} />
      <div className="artikel-konten">
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
}

export default SebuahArtikel;
