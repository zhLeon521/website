import dayjs from 'dayjs';

export const formatDate = (date: string | Date, format?: string) => dayjs(date).format(format ?? 'MMMM DD, YYYY');
