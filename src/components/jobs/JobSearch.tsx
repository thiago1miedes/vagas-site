'use client';

import { Input } from '@/components/ui/Input';
import { SearchIcon } from '@/components/ui/icons';

/** Campo de busca das listagens: filtra enquanto se digita. */
export function JobSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative" role="search">
      <SearchIcon className="left-4 h-5 w-5" />
      <Input
        id="busca-vagas"
        type="search"
        label="Buscar vagas"
        hideLabel
        size="lg"
        className="pl-12"
        placeholder="Pesquisar por cargo, empresa ou palavra-chave"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
