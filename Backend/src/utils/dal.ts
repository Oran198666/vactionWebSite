import mysql2, { PoolOptions, QueryError, QueryResult } from "mysql2";
import { appConfig } from "./app-config";


class Dal {
    //DB Configuration:
    private readonly options: PoolOptions = {
        host: appConfig.mysqlHost,
        user: appConfig.mysqlUser,
        password: appConfig.mysqlPassword,
        database: appConfig.mysqlDatabase,
        port: appConfig.mysqlPort
    };

    // Connection object:
    private readonly connection = mysql2.createPool(this.options);

    // Execute SQL:
    public execute(sql:string, values?:(string | number | boolean | Date | null | undefined)[]):Promise<QueryResult>{

        return new Promise<QueryResult>((resolve, reject) => {

            //invoke callback
            this.connection.query(sql,values,(err: QueryError | null, result:QueryResult)=>{
                if (err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        });
    }
}

export const dal = new Dal();