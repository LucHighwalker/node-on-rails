export default {
  middleware: `\t\tthis.server.use(expressSanitizer());
\t\tthis.server.use(bodyParser.json());
\t\tthis.server.use(bodyParser.urlencoded({ extended: true }));
\t\tthis.server.use(cors());`
}