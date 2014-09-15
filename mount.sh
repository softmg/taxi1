sudo umount /var/www/phonegap/lib/iphone/
sudo rm -rf /var/www/phonegap/lib/iphone/
sudo mkdir /var/www/phonegap/lib/iphone/
sudo chown alex:alex /var/www/phonegap/lib/iphone/
ifuse /var/www/phonegap/lib/iphone/ --root