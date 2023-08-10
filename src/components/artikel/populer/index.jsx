import Author from "../author";
import "./style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "use-http";

function Populer() {
  const [posts, setPosts] = useState([]);
  const { get } = useFetch(`${import.meta.env.VITE_API_URL}posts/search`, {});

  useEffect(() => {
    get("?limit=3&sort=desc&sortField=visitor").then((res) => {
      setPosts(res || []);
    });
  }, []);

  return (
    <div className="artikel-populer">
      <h1>
        Artikel <span>Populer</span>
      </h1>
      <div className="artikel-group">
        {posts.length > 0 && (
          <Link to={`/artikel/${posts[0]._id}`}>
            <div className="artikel-card-primary">
              <img src={posts[0].cover} alt="" />
              <div>
                <h3>{posts[0].title}</h3>
                <Author {...posts[0].owner} {...posts[0]} />
              </div>
            </div>
          </Link>
        )}
        <div>
          {posts.length > 1 && (
            <Link to={`/artikel/${posts[1]._id}`}>
              <div className="artikel-card-secondary">
                <img src={posts[1].cover} alt="" />
                <div>
                  <h3>{posts[1].title}</h3>
                  <Author {...posts[1].owner} {...posts[1]} />
                </div>
              </div>
            </Link>
          )}
          {posts.length > 2 && (
            <Link to={`/artikel/${posts[2]._id}`}>
              <div className="artikel-card-secondary">
                <img src={posts[2].cover} alt="" />
                <div>
                  <h3>{posts[2].title}</h3>
                  <Author {...posts[2].owner} {...posts[2]} />
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Populer;
