export default async function existAccount(client,account){
    let r=await client.database.getAccounts([account])
    return (r[0] ? true : false)
}