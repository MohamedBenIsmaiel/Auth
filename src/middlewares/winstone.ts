import { createLogger, format, transports } from 'winston';

//'winston-daily-rotate-file' for remove log percount or date

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'Fatura' },
  transports: [
    new transports.File({ filename: '../logs/app-error.log', level: 'error' }),
    new transports.File({ filename: '../logs/app-combined.log' })
    /* un-comment if you want to enable rotate file
    new transports.DailyRotateFile({
      filename: '/var/log/your-project/app-combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '1m',

    }),
    */
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())})
  );
}

export default logger;
