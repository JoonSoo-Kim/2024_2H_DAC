from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.utils.dates import days_ago
import os
import pandas as pd

# CSV 파일이 저장된 폴더 경로
folder_path = os.path.join(os.path.dirname(__file__), 'correlation')

def recommend_stocks(**kwargs):
    input_stock = kwargs['dag_run'].conf.get('input_stock')
    ti = kwargs['ti']
    # 입력된 종목의 CSV 파일 불러오기
    encoded_stock = input_stock.encode('utf-8').decode('utf-8')
    file_path = os.path.join(folder_path, f"{encoded_stock}_corr.csv")
    try:
        data = pd.read_csv(file_path, index_col=0)
    except FileNotFoundError:
        return f"{input_stock}에 대한 파일을 {folder_path}에서 찾을 수 없습니다."

    # 먼저 상관계수를 오름차순으로 정렬함
    sorted_data = data['Correlation'].sort_values()

    # 입력으로 들어온 종목과 큰 음의 상관관계를 가진 종목을 찾는다. (리스크  헷징 효과가 큰 종목)
    negative_corr_stock = sorted_data.idxmin()
    negative_corr_value = sorted_data.min()

    # 입력으로 들어온 종목과 가장 큰 양의 상관관계를 가진 종목을 찾는다. (리스크 헷징 효과가 약한 종목)
    positive_corr_stock = sorted_data.idxmax()
    positive_corr_value = sorted_data.max()

    # 입력으로 들어온 종목과 상관계수가 중간인 종목을 찾는다. (중립적인 투자자에게 적합)
    middle_index = len(sorted_data) // 2
    middle_corr_stock = sorted_data.index[middle_index]
    middle_corr_value = sorted_data.iloc[middle_index]

    result = {
        '보수적 성향 (리스크 헷징 효과가 큰 종목)': (negative_corr_stock, negative_corr_value),
        '공격적 성향 (리스크 헷징 효과가 약한 종목)': (positive_corr_stock, positive_corr_value),
        '중립적 성향 (중립적인 투자에 적합한 종목)': (middle_corr_stock, middle_corr_value)
    }

    # XCom에 결과를 저장
    ti.xcom_push(key='recommendation_result', value=result)
    print(f"XCom: {ti.xcom_pull(key='recommendation_result', task_ids='recommend_stocks')}")
    # 추가 로깅
    print(f"Recommendation result pushed to XCom: {result}")

default_args = {
    'owner': 'airflow',
    'start_date': days_ago(1),
}

dag = DAG(
    'recommend_dag',
    default_args=default_args,
    description='A DAG to recommend stocks based on correlation',
    schedule_interval=None,
)

with dag:
    recommend_task = PythonOperator(
        task_id='recommend_stocks',
        python_callable=recommend_stocks,
        provide_context=True,
    )

    recommend_task