import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const DB_MYDATA = 'mydb';

export interface Product{
  id: number
  productName: string
  calories: number
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  private db!: SQLiteDBConnection
  public products: any

  constructor() { }

  async initializPlugin(){
    this.db = await this.sqlite.createConnection(
      DB_MYDATA,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open()

    const schema = 'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, productName TEXT NOT NULL, calories INTEGER);'

    await this.db.execute(schema)
    this.loadProducts()
    return true
  }

  getProducts() {
    return this.products
  }

  async loadProducts(){
    const products = await this.db.query('SELECT * FROM products')
    this.products.set(products.values || [])
  }

  async addProduct(productName: string, calories: number){
    const result = await this.db.query(`INSERT INTO products(productName, calories) VALUES('${productName}', '${calories}');`)

    this.loadProducts()

    return result
  }
}
