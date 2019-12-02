interface BreadCrumbItem {
  label: string;
  url: Array<string> | string;
}

interface Month {
  key: string;
  name: string;
}

interface Game {
  game_id: number;
  game_name: string;
  disabled: boolean;
}

interface RouterParams {
  [key: string]: string;
}

export {BreadCrumbItem, Month, Game, RouterParams};
