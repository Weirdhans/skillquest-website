#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Wrapper to run DeepL translation with API key from .env.local"""

import os
import sys
import subprocess

# Read API key from .env.local
env_local_path = '.env.local'
api_key = None

if os.path.exists(env_local_path):
    with open(env_local_path, 'r') as f:
        for line in f:
            line = line.strip()
            if line.startswith('DEEPL_API_KEY='):
                api_key = line.split('=', 1)[1].strip()
                break

if not api_key:
    print("❌ Error: Could not find DEEPL_API_KEY in .env.local")
    sys.exit(1)

# Set environment variable and run translation script
env = os.environ.copy()
env['DEEPL_API_KEY'] = api_key

# Pass through command line arguments
cmd = [sys.executable, 'tools/deepl_translate_json.py'] + sys.argv[1:]

# Run the translation script
result = subprocess.run(cmd, env=env)
sys.exit(result.returncode)
