import {
  IonContent,
  IonPage,
  IonAlert,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import Addbutton from "../components/Addbutton";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { addCard } from "../slices/cardSlice";
import CardsList from "../components/CardsList";

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const dispatchCard = (title) => {
    console.log("FFF");

    if (title.length > 0) {
      // console.log(title);
      dispatch(
        addCard({
          id: nanoid(),
          title,
          content: [],
          type: {
            random: false,
            four: false,
            reverse: false,
            strict: false,
          },
        })
      );
    }
  };

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>wordCardss</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">wordCards</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <CardsList />

        <IonAlert
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
          cssClass="my-custom-class"
          header={"単語帳を新たに追加"}
          inputs={[
            {
              name: "name",
              type: "text",
              placeholder: "名前",
            },
          ]}
          buttons={[
            {
              text: "キャンセル",
              role: "cancel",
            },
            {
              text: "OK",
              handler: (data) => dispatchCard(data.name),
            },
          ]}
        />
        <Addbutton handleClick={handleClick} />
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
