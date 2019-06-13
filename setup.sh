#!/bin/bash

********************** Bakup Existing Data **********************
DATE=$(date +%Y-%m-%d-%H%M%S)
BACKUP_DIR="/tmp/cb1-backup"
SOURCE="/var/www/cb1"
tar -cvzpf $BACKUP_DIR/backup-$DATE.tar.gz $SOURCE

********************** Deploying Latest Code *******************
cd /var/www/html/cb1
rm -rf *
cp -r /jenkins/workspace/dev-dds-cohort/* /var/www/html/cb1
