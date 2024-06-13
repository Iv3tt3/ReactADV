import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../componentes/layout/Layout";
import { deleteAdvert, getAdvert } from "./service";
import { useEffect, useState } from "react";
import Advert from "./components/Advert";
import Button from "../../componentes/shared/Button";

export function AdvertDetail() {
  const params = useParams().id;
  const navigate = useNavigate();

  const [ad, setAd] = useState(null);

  const [showConfirm, setShowCofirm] = useState(false);

  const deleteAd = () => {
    deleteAdvert(params);
    navigate("/");
  };

  useEffect(() => {
    async function getDataFromService() {
      try {
        const adData = await getAdvert(params);
        setAd(adData);
      } catch (error) {
        if (error.status === 404) navigate("/404");
      }
    }
    getDataFromService();
  }, [params, navigate]);

  return (
    <Layout>
      {ad ? <Advert {...ad}></Advert> : null}
      {showConfirm && (
        <div>
          <p>Are you sure you want to delete the advert?</p>
          <Button onClick={deleteAd}>YES! Delete the Ad</Button>
          <Button onClick={() => setShowCofirm(false)}>NO! Cancel</Button>
        </div>
      )}
      {!showConfirm && (
        <Button onClick={() => setShowCofirm(true)}>Delete Ad</Button>
      )}
    </Layout>
  );
}
