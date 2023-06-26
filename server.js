import app from './src/app.js'
import fs from 'fs';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';

const file =fs.readFileSync('./swagger/ecomm.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`Server running at: htttp://localhost:${port}`)
});