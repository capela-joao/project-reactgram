import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface timeAgoProps {
  date: string | Date;
}

const TimeAgo = ({ date }: timeAgoProps) => {
  return (
    <span className="text-gray-500">
      {formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: ptBR,
      })}
    </span>
  );
};

export default TimeAgo;
