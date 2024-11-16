# dags/hello_world_dag.py
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def push_hello_world(**kwargs):
    # "hello world"를 반환
    return 'hello world'

with DAG(
    dag_id='hello_world_dag',
    start_date=datetime(2023, 1, 1),
    schedule_interval=None,  # 트리거될 때만 실행되도록 설정
    catchup=False
) as dag:
    hello_task = PythonOperator(
        task_id='hello_task',
        python_callable=push_hello_world,
        provide_context=True  # XCom을 사용하기 위해 필요한 설정
    )