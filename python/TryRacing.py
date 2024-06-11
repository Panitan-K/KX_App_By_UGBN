import dash
from dash import dcc, html
import plotly.express as px
import pandas as pd
from dash.dependencies import Input, Output

# Load and prepare data
df = pd.read_csv('./python/data/data.csv')

app = dash.Dash(__name__)

app.layout = html.Div([
    dcc.Graph(id='racing-line-chart'),
    dcc.Interval(
        id='interval-component',
        interval=1*1000,  # in milliseconds
        n_intervals=0
    )
])

@app.callback(
    Output('racing-line-chart', 'figure'),
    Input('interval-component', 'n_intervals')
)
def update_chart(n):
    fig = px.line(df, x='time', y='value', color='category')
    # Add logic to show only up to the current interval
    return fig

if __name__ == '__main__':
    app.run_server(debug=True)
