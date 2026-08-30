'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/ui/Input';
import { SearchIcon } from '@/components/ui/icons';

/**
 * Campo de busca que leva para /vagas?q=...
 * Usado no header e no topo da home. Funciona também sem JavaScript, pelo
 * `action` do formulário.
 */
export function JobSearchForm({
  id,
  size = 'md',
  placeholder = 'Buscar vagas',
  label = 'Buscar vagas',
  autoFocus = false,
}: {
  id: string;
  size?: 'md' | 'lg';
  placeholder?: string;
  label?: string;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [term, setTerm] = useState('');

  return (
    <form
      action="/vagas"
      method="get"
      role="search"
      className="relative w-full"
      onSubmit={(event) => {
        event.preventDefault();
        const query = term.trim();
        router.push(query ? `/vagas?q=${encodeURIComponent(query)}` : '/vagas');
      }}
    >
      <SearchIcon
        className={size === 'lg' ? 'left-4 h-5 w-5' : 'left-3 h-4 w-4'}
      />
      <Input
        id={id}
        name="q"
        type="search"
        label={label}
        hideLabel
        size={size}
        autoFocus={autoFocus}
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder={placeholder}
        className={size === 'lg' ? 'pl-12' : 'pl-9'}
      />
      <button type="submit" className="sr-only">
        Buscar
      </button>
    </form>
  );
}
