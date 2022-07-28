import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

function Home() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function getData() {
      setLoading(true);

      const querySnapshot = await getDocs(collection(db, "articles"));

      if (ignore) return;

      const articleDocs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });

      setArticles(articleDocs);

      setLoading(false);
    }
    getData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Container className="mt-3">
      <Row className="g-3">
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          articles.map((article) => (
            <Col lg={4} key={article.id}>
              <Card body>
                <Link to={`/article/${article.id}`}>{article.title}</Link>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Home;
