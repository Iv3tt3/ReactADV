import { useParams } from "react-router-dom";
import Layout from "../../componentes/layout/Layout";
import { useEffect, useState } from "react";
import Advert from "./components/Advert";
import Button from "../../componentes/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAdvert } from "../../store/selectors";
import { deleteAdvert, loadAdvert } from "../../store/actions";

export function AdvertDetail() {
  
  const adId = useParams().id;

  const ad = useSelector(getAdvert(adId))
  const dispatch = useDispatch()

  const [showConfirm, setShowCofirm] = useState(false);

  const deleteAd = () => {
    dispatch(deleteAdvert(adId));
  };

  useEffect(() => {
    dispatch(loadAdvert(adId))
  }, [adId, dispatch]);

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
