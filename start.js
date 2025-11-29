const { spawn } = require('child_process');
const path = require('path');
const { exec } = require('child_process');

console.log('🚀 Starting Information Retrieval Application...\n');

// Check if Solr is already running
function checkSolrRunning(callback) {
  // First check with netstat
  exec('netstat -ano | findstr :8983', (error, stdout) => {
    if (stdout && stdout.trim()) {
      // Double check with Solr status command
      const solrBinPath = path.join(__dirname, 'backend', 'solr-9.1.1', 'bin', 'solr.cmd');
      exec(`"${solrBinPath}" status`, (error2, stdout2) => {
        if (stdout2 && stdout2.includes('running')) {
          console.log('✅ Solr is already running on port 8983');
          callback(true);
        } else {
          callback(false);
        }
      });
    } else {
      callback(false);
    }
  });
}

// Start Solr
function startSolr() {
  const solrDir = path.join(__dirname, 'backend', 'solr-9.1.1', 'bin');
  const solrCmd = path.join(solrDir, 'solr.cmd');
  const solrBatchPath = path.join(__dirname, 'start-solr.bat');
  
  console.log('📦 Starting Solr server...');
  console.log('   Opening Solr startup window...');
  console.log('   ⚠️  IMPORTANT: If you see a UAC prompt, click "Yes" to allow admin access');
  console.log('   The Solr window will stay open - DO NOT close it while the app is running');
  console.log('   If Solr doesn\'t start, check the "Solr Server" window for errors\n');
  
  // Start Solr using the batch file in a new window
  // Use absolute path to avoid issues
  const fullBatchPath = path.resolve(solrBatchPath);
  
  const solrProcess = spawn('cmd', [
    '/c',
    'start',
    '"Solr Server"',
    'cmd',
    '/k',
    `cd /d "${__dirname}" && "${fullBatchPath}"`
  ], {
    detached: true,
    stdio: 'ignore',
    shell: true,
    cwd: __dirname
  });

  solrProcess.unref();
  
  // Wait a bit for Solr to start
  setTimeout(() => {
    console.log('⏳ Waiting for Solr to initialize (this may take 30-90 seconds)...');
    console.log('');
    console.log('   📋 IMPORTANT: Check the "Solr Server" window that just opened!');
    console.log('   - If you see a UAC prompt → Click "Yes"');
    console.log('   - If Solr shows errors → See QUICK_FIX.md');
    console.log('   - If nothing happens → Manually run: start-solr.bat as administrator');
    console.log('   - Success looks like: "Started Solr server on port 8983"');
    console.log('');
    waitForSolr();
  }, 3000);
}

// Wait for Solr to be ready
function waitForSolr(maxAttempts = 30, attempt = 0) {
  if (attempt >= maxAttempts) {
    console.log('\n⚠️  Solr did not start after 90 seconds.');
    console.log('   Please check:');
    console.log('   1. Is Java installed? (run: java -version)');
    console.log('   2. Did the Solr window show any errors?');
    console.log('   3. Try manually running: start-solr.bat as administrator');
    console.log('   4. Or start Solr manually: cd backend\\solr-9.1.1\\bin && solr.cmd start\n');
    console.log('Continuing anyway - backend will retry connecting...\n');
    startBackendAndFrontend();
    return;
  }

  // Use Node.js http module instead of curl (more cross-platform)
  const http = require('http');
  const req = http.get('http://localhost:8983/solr/admin/ping', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        if (response.status === 'OK') {
          console.log('\n✅ Solr is ready!\n');
          startBackendAndFrontend();
          return;
        }
      } catch (e) {
        // Not ready yet
      }
      if (attempt % 5 === 0) {
        process.stdout.write(`\n   Still waiting... (${attempt * 3}s)`);
      } else {
        process.stdout.write('.');
      }
      setTimeout(() => waitForSolr(maxAttempts, attempt + 1), 3000);
    });
  });
  
  req.on('error', () => {
    if (attempt % 5 === 0) {
      process.stdout.write(`\n   Still waiting... (${attempt * 3}s)`);
    } else {
      process.stdout.write('.');
    }
    setTimeout(() => waitForSolr(maxAttempts, attempt + 1), 3000);
  });
  
  req.setTimeout(2000, () => {
    req.destroy();
    if (attempt % 5 === 0) {
      process.stdout.write(`\n   Still waiting... (${attempt * 3}s)`);
    } else {
      process.stdout.write('.');
    }
    setTimeout(() => waitForSolr(maxAttempts, attempt + 1), 3000);
  });
}

// Start backend and frontend
function startBackendAndFrontend() {
  console.log('🔧 Starting Node.js backend server...');
  console.log('⚛️  Starting React frontend...\n');
  console.log('📝 Backend will run on: http://localhost:5000');
  console.log('🌐 Frontend will run on: http://localhost:3000');
  console.log('🔍 Solr admin panel: http://localhost:8983/solr/\n');
  console.log('Press Ctrl+C to stop all services\n');

  const concurrently = require('concurrently');
  
  concurrently([
    {
      name: 'backend',
      command: 'npm run dev',
      cwd: path.join(__dirname, 'server'),
      prefixColor: 'blue'
    },
    {
      name: 'frontend',
      command: 'npm start',
      cwd: path.join(__dirname, 'frontend'),
      prefixColor: 'green'
    }
  ], {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 1
  });
}

// Main execution
checkSolrRunning((isRunning) => {
  if (!isRunning) {
    startSolr();
  } else {
    console.log('\n');
    startBackendAndFrontend();
  }
});

