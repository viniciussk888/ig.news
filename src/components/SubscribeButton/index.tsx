import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stipe-js";
import styles from "./styles.module.scss";

interface SubscribButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribButtonProps) {
  const { status } = useSession();

  async function handleSubscribe() {
    if (status === "unauthenticated") {
      signIn("github");
      return;
    }

    //criação da checkout session
    try {
      const response = await api.post("subscribe");

      const { sessionId } = response.data;
      console.log(sessionId);

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <button
      onClick={() => handleSubscribe()}
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
}
