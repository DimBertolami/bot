# CryptoTradeBot
so my environment is ubuntu server, latest version and xampp

in this directory you'll find an archive called Webroot. Extract this file to your webroot, (in my case: /opt/lampp/htdocs)
python3 -m venv /opt/lampp/htdocs/venv

Backend launcher:
![image](https://github.com/user-attachments/assets/2e16c2b5-a48f-44e6-b711-99f542fe1f5a)
![image](https://github.com/user-attachments/assets/8b80181c-fdd3-46d1-a0bb-39dac3a65058)
as you can see this script has a bit of built in functionality, it launches the backend, it can reload it, kill all instances of and display less verbose or display full debugging info
Frontend launch: (npm run for the different values, like dev, build, lint, preview, etc..)
![image](https://github.com/user-attachments/assets/d8328ea4-474f-488e-b29c-e61da71793e2)

frontend:
![image](https://github.com/user-attachments/assets/d6f32819-4752-444c-ba1d-f9f6aea91d88)


under the folder bot/frontend/src/components you will find BinanceDataDisplay.py and CoinGeckoDataDisplay.py
you can run these using something like: python3 CoinGeckoDataDisplay.py
![image](https://github.com/user-attachments/assets/ea6cf795-66c5-4b60-86e2-8c155eb7f5c6)
![image](https://github.com/user-attachments/assets/99888916-60d4-468d-b9f7-9cceabbd2167)


