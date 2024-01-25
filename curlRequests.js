const { exec } = require('child_process');
const fs = require('fs');

// Get the file path from the command-line arguments
const filePath = process.argv[2];

if (!filePath) {
  console.error('Uso: node curlRequests.js <file_path>');
  process.exit(1);
}

// Read the contents of the specified text file
const command = fs.readFileSync(filePath, 'utf8');

// Execute the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro executando o comando: ${error.message}`);
    return;
  }
  
  console.log('Output API:', stdout);
});
