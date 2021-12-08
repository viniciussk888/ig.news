import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

interface SubscribButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribButtonProps) {
  const { status } = useSession();

  async function handleSubscribe() {
    if (status !== "authenticated") {
      signIn("github");
      return;
    }
    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
}
