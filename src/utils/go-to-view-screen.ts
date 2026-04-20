import Router from "next/router";

export function goToViewScreen(id: number | string) {
  Router.replace(`view/${id}`);
}
