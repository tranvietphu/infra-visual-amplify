def handler(event, context):
    print('received event:')
    print(event)
    return {
        'statusCode': '200',
        'body': {},
        'headers': {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
        }
    }
