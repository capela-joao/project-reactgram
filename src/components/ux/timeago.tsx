import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface timeAgoProps {
  date: string | Date;
}

const getMinimalTimeAgo = (date: string | Date) => {
  const distance = formatDistanceToNow(new Date(date), {
    locale: ptBR,
  });

  // Mapeamento para versões curtas
  const replacements: Record<string, string> = {
    'menos de um minuto': 'agora',
    minutos: 'min',
    minuto: 'min',
    horas: 'h',
    hora: 'h',
    dias: 'd',
    dia: 'd',
    semanas: 'sem',
    semana: 'sem',
    meses: 'meses',
    mês: 'mês',
    anos: 'anos',
    ano: 'ano',
    'cerca de ': '',
    'aproximadamente ': '',
    'há ': '',
  };

  let result = distance;
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(key, value);
  });

  return result;
};

const TimeAgo = ({ date }: timeAgoProps) => {
  return <span className="text-gray-500">{getMinimalTimeAgo(date)}</span>;
};

export default TimeAgo;
