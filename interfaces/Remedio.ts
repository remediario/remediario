export interface Remedio {
  nome: string;
  principioAtivo: string;
  tipo: "De referência" | "Genérico" | "Similar" | "Fitoterápico";
  categoria: string;
  fabricante: string;
}
