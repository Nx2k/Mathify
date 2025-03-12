from flask import Blueprint, request, jsonify
import sympy as sp
import numpy as np

main = Blueprint('main', __name__)

@main.route('/api/solve', methods=['POST'])
def solve_equation():
    data = request.json
    equation = data.get('equation', '')
    
    try:
        # Crear un símbolo para la variable
        x = sp.Symbol('x')
        
        # Verificar si es una ecuación (contiene un signo igual)
        if '=' in equation:
            left_side, right_side = equation.split('=')
            # Mover todo a un lado: left_side - right_side = 0
            expr = sp.sympify(left_side) - sp.sympify(right_side)
            # Resolver la ecuación
            solution = sp.solve(expr, x)
            return jsonify({'result': str(solution)})
        else:
            # Si no es una ecuación, evaluar la expresión
            expr = sp.sympify(equation)
            result = expr.evalf()
            return jsonify({'result': str(result)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@main.route('/api/derivative', methods=['POST'])
def calculate_derivative():
    data = request.json
    expression = data.get('expression', '')
    variable = data.get('variable', 'x')
    
    try:
        # Crear un símbolo para la variable
        var = sp.Symbol(variable)
        # Calcular la derivada
        expr = sp.sympify(expression)
        derivative = sp.diff(expr, var)
        return jsonify({'result': str(derivative)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@main.route('/api/integrate', methods=['POST'])
def calculate_integral():
    data = request.json
    expression = data.get('expression', '')
    variable = data.get('variable', 'x')
    
    try:
        # Crear un símbolo para la variable
        var = sp.Symbol(variable)
        # Calcular la integral
        expr = sp.sympify(expression)
        integral = sp.integrate(expr, var)
        return jsonify({'result': str(integral)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400 