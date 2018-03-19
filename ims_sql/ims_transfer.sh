db_host=127.0.0.1
db_pass=123456
db_user=root
db_name=eichong

echo "db host:" ${db_host}
echo "db pass:" ${db_pass}
echo "db user:" ${db_user}
echo "db name:" ${db_name}

echo mysql -u${db_user} -h${db_host} -p${db_pass}  ${db_name}  

#echo `date`  "mysql -u${db_user} -h${db_host} -p${db_pass}  ${db_name}  < old_procedure_and_function.sql"
#mysql -u${db_user} -h${db_host} -p${db_pass}  ${db_name}  < old_procedure_and_function.sql

echo `date`  "mysql -u${db_user} -h${db_host} -p${db_pass}  ${db_name}  < zhangchunyang/1_rename.sql" 
mysql -u${db_user} -h${db_host} -p${db_pass}  ${db_name}  < zhangchunyang/1_rename.sql

echo `date`  "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  < zhangchunyang/2_new_table.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  < zhangchunyang/2_new_table.sql

echo `date`  "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  < zhangchunyang/3_structure.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  < zhangchunyang/3_structure.sql

echo `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/4_init.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/4_init.sql

echo   `date`  "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/5_company.sql" 
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/5_company.sql

echo `date`  "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/6_user.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/6_user.sql

echo   `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/7_card.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/7_card.sql

echo  `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/8_account.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/8_account.sql

echo  `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/9_history_data.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/9_history_data.sql


echo  `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/11_new_column.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/11_new_column.sql 

echo  `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/12_menu.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/12_menu.sql 

echo  `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/14_warn.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/14_warn.sql

echo  `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/15_pile.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/15_pile.sql

echo  `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/10_drop.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/10_drop.sql

echo   `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  gaoxiang_sql.sql"
#mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  gaoxiang_sql.sql

echo   `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zangyaoyi_sql.sql"   
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zangyaoyi_sql.sql 

echo  `date` "mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/13_pur.sql"
mysql -u${db_user} -h${db_host} -p${db_pass} ${db_name}  <  zhangchunyang/13_pur.sql 
 
date




