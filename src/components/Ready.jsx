import { useState } from "react";
import {
  IonPage,
  IonToggle,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonLabel,
  IonItem,
  useIonViewWillEnter,
  IonButton,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
const Ready = ({ match }) => {
  const Id = match.params.cardId;
  const [four, setFour] = useState(false); // toggleをdisableにするためのstate
  const [wordCards, setWordCards] = useState([]);
  const WS = useSelector((state) => state.cards.card);
  const Words = WS.find((data) => data.id === Id);
  const location = useLocation();
  // console.log(location.pathname);
  useIonViewWillEnter(() => {
    const targetKey = "array";
    if (targetKey in localStorage) {
      const saveDate = JSON.parse(localStorage[targetKey]);
      setWordCards([...saveDate]);
    }
    // console.log("hello");
  });
  // console.log(wordCards);
  // if (!(wordCards.length > 0)) {
  //   return null;
  // }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{Words.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {/* {wordCards.length > 0 && wordCards[target].title} */}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonItem>
            <IonLabel>
              <h2>ランダムに出題</h2>
              <p>単語帳の並びをランダムにします。</p>
            </IonLabel>
            <IonToggle value="randam" value="randam" />
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>問題を四択にする</h2>
              <p>入力形式から選択形式にします。</p>
            </IonLabel>
            <IonToggle
              value={four}
              onIonChange={(e) => setFour(e.detail.checked)}
            />
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>strictモードにする</h2>
              <p>文字列が完全に一致しているとき正解になります。</p>
            </IonLabel>
            <IonToggle disabled={four} value="strict" />
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>単語を裏返す</h2>
              <p>単語帳の訳を表にします。</p>
            </IonLabel>
            <IonToggle value="reversed" />
          </IonItem>
        </IonCard>
      </IonContent>
      <IonButton
        className="ion-margin"
        expand="block"
        routerLink={`/test/${Id}`}
      >
        単語テストを始める
      </IonButton>
    </IonPage>
  );
};

export default Ready;
