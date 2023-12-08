import { useState } from "react";
import axios from "axios";

export default function FetchHooks() {
  const [loading, setLoading] = useState(true);
  function get(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((data) => {
          if (!data) {
            return reject(data);
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => setLoading(false));
    });
  }

  return { get, loading, setLoading };
}
